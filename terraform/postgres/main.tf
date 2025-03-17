resource "aws_db_subnet_group" "database_subnet" {
  name       = "${var.project}_database_subnet"
  subnet_ids = var.private_subnet_ids
}

resource "aws_security_group" "database_security_group" {
  name        = "${var.project}_database_security_group"
  description = "${var.project}_database_security_group"
  vpc_id      = var.vpc_id

  ingress {
    description = "Access from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.ingress_cidr_block]
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
