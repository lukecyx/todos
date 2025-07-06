resource "aws_security_group" "alb_sg" {
  name   = "alb-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "tcp"
  }

  tags = {
    Name = "alb_sg"
  }
}

resource "aws_security_group" "ec2_sg" {
  name   = "ec2-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port       = 80
    to_port         = 80
    security_groups = [aws_security_group.alb_sg.id]
    protocol        = "tcp"
  }

  ingress {
    from_port       = 443
    to_port         = 443
    security_groups = [aws_security_group.alb_sg.id]
    protocol        = "tcp"
  }

  egress {
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "tcp"
  }

  tags = {
    Name = "ec2_sg"
  }
}

data "aws_iam_policy_document" "allow_ssm_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "allow_ssm_role" {
  name               = "ssm-role"
  description        = "Allow SSM access to EC2"
  assume_role_policy = data.aws_iam_policy_document.allow_ssm_role_policy.json
}

resource "aws_iam_instance_profile" "allow_ssm_iam_profile" {
  name = "ec2_profile"
  role = aws_iam_role.allow_ssm_role.name
}

resource "aws_iam_role_policy_attachment" "allow_ssm_iam_policy" {
  role       = aws_iam_role.allow_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# data "template_file" "install_software" {
#   template = file("${path.module}/scripts/install-bastion-software.yaml")
# }


resource "aws_instance" "ec2s" {
  count                       = length(var.subnet_ids)
  ami                         = "ami-08f9a9c699d2ab3f9"
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  subnet_id                   = var.subnet_ids[count.index]
  iam_instance_profile        = aws_iam_instance_profile.allow_ssm_iam_profile.name
  associate_public_ip_address = true

  tags = {
    Name = "ec2-${var.subnet_ids[count.index]}"
  }
}

resource "aws_s3_bucket" "alb_access_logs_bucket" {
  bucket = "${var.project}-alb-access-logs-bucket"
}

data "aws_iam_policy_document" "allow_access_alb_logs" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["elasticloadbalancing.amazonaws.com"]
    }

    actions = [
      "s3:*",
    ]

    resources = [
      aws_s3_bucket.alb_access_logs_bucket.arn,
      "${aws_s3_bucket.alb_access_logs_bucket.arn}/*",
    ]
  }
}
resource "aws_s3_bucket_policy" "allow_access_alb_logs" {
  bucket = aws_s3_bucket.alb_access_logs_bucket.id
  policy = data.aws_iam_policy_document.allow_access_alb_logs.json
}


resource "aws_lb" "alb" {
  name               = "${var.project}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = var.subnet_ids

  enable_deletion_protection = false

  # access_logs {
  #   bucket  = aws_s3_bucket.alb_access_logs_bucket.id
  #   prefix  = "${var.project}-alb-logs"
  #   enabled = true
  # }
}
