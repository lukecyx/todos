resource "aws_db_subnet_group" "database_subnet" {
  name       = "${var.project}_database_subnet"
  subnet_ids = var.private_subnet_ids
}

resource "aws_security_group" "database_security_group" {
  name        = "${var.project}_database_security_group"
  description = "${var.project}_database_security_group"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Access from VPC"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    cidr_blocks     = [var.ingress_cidr_block]
    security_groups = [var.bastion_sg_id]
  }
}
resource "random_password" "db_master_pass" {
  length  = 40
  special = false
  keepers = {
    pass_version = 1
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage          = 20
  max_allocated_storage      = 20
  identifier                 = "${var.project}-postgres-rds"
  engine                     = "postgres"
  engine_version             = "17.2"
  instance_class             = "db.t3.micro"
  username                   = "postgres"
  password                   = random_password.db_master_pass.result
  parameter_group_name       = "default.postgres17"
  publicly_accessible        = false
  skip_final_snapshot        = true
  auto_minor_version_upgrade = false
  vpc_security_group_ids     = [aws_security_group.database_security_group.id]
  db_subnet_group_name       = aws_db_subnet_group.database_subnet.name
  apply_immediately          = true
}

resource "aws_ssm_parameter" "db_connection_string" {
  name  = "db_connection_string_${var.project}"
  type  = "String"
  value = "postgresql://${aws_db_instance.postgres.username}:${random_password.db_master_pass.result}@${aws_db_instance.postgres.address}:5432/postgres"
}

resource "aws_ssm_parameter" "db_host" {
  name  = "db_host"
  type  = "String"
  value = aws_db_instance.postgres.endpoint
}


# resource "aws_secretsmanager_secret" "db_connection_string" {
#   name = "db_connection_string_${var.project}"
# }
#
# resource "aws_secretsmanager_secret_version" "db_connection_string_version" {
#   secret_id     = aws_secretsmanager_secret.db_connection_string.id
#   secret_string = random_password.db_master_pass.result
# }

# 1 get a db secret in ssm to be used by proxy to connect to db -- already hve this
# 2 need to create an IAM role to allow rds to access db secret
# 3 use IAM auth when connecting to proxy
# Use the private subnets where the db is
# note
# the application code needs access to the proxy
# the proxy also needs access to the db
# thsi is done via security groups


# resource "aws_iam_role" "db_proxy_role" {
#   name = "db_proxy_role"
#
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "rds.amazonaws.com"
#         }
#       }
#     ]
#   })
# }
#
# resource "aws_secretsmanager_secret" "db_credentials" {
#   name = "db_credentials_${var.project}"
# }
#
# resource "aws_secretsmanager_secret_version" "db_credentials_version" {
#   secret_id = aws_secretsmanager_secret.db_credentials.id
#   secret_string = jsonencode({
#     username = "postgres"
#     password = random_password.db_master_pass.result
#   })
# }
#
# data "aws_caller_identity" "current" {}
#
# resource "aws_iam_policy" "db_proxy_policy" {
#   name        = "db_proxy_policy"
#   description = "Policy for db proxy"
#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Action = ["rds-db:connect"]
#         Effect = "Allow"
#         Resource = [
#           "arn:aws:rds-db:eu-west-1:${data.aws_caller_identity.current.account_id}:dbuser:${aws_db_instance.postgres.db_name}/${aws_db_instance.postgres.username}"
#         ]
#       }
#     ]
#   })
# }
#
# resource "aws_iam_role_policy_attachment" "rds_proxy_policy_attachment" {
#   policy_arn = aws_iam_policy.db_proxy_policy.arn
#   role       = aws_iam_role.db_proxy_role.name
# }
#
# resource "aws_db_proxy" "rds_proxy" {
#   name                   = "rds-proxy"
#   debug_logging          = false
#   engine_family          = "POSTGRESQL"
#   idle_client_timeout    = 1800
#   require_tls            = true
#   role_arn               = aws_iam_role.db_proxy_role.arn
#   vpc_security_group_ids = [aws_security_group.database_security_group.id]
#   vpc_subnet_ids = [
#     var.private_subnet_ids[0],
#     var.private_subnet_ids[1],
#     var.private_subnet_ids[2],
#   ]
#
#   auth {
#     description = "IAM Auth"
#     iam_auth    = "REQUIRED"
#     secret_arn  = aws_secretsmanager_secret.db_credentials.arn
#   }
# }
