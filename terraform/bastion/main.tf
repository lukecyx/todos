resource "aws_security_group" "ec2_sg" {
  name   = "ec2-sg"
  vpc_id = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "-1"
  }

  tags = {
    Name = "bastion_sg"
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

data "template_file" "install_software" {
  template = file("${path.module}/scripts/install-bastion-software.yaml")
}

resource "aws_instance" "bastion" {
  ami                         = "ami-02a6c118d4f9a1ba0"
  instance_type               = "t4g.nano"
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  subnet_id                   = var.subnet
  iam_instance_profile        = aws_iam_instance_profile.allow_ssm_iam_profile.name
  user_data                   = data.template_file.install_software.rendered
  associate_public_ip_address = true

  tags = {
    Name = "bastion"
  }
}
