output "private_subnet_ids" {
  value = [
    aws_subnet.private_az1.id,
    aws_subnet.private_az2.id,
    aws_subnet.private_az3.id,
  ]
}

output "public_subnet_ids" {
  value = [
    aws_subnet.public_az1.id,
    aws_subnet.public_az2.id,
    aws_subnet.public_az3.id,
  ]
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "vpc_cidr_block" {
  value = aws_vpc.main.cidr_block
}
