variable "project" {
  description = "The name of the project"
  type        = string
}

variable "private_subnet_ids" {
  description = "The subnet ids of the private subnets"
  type        = list(string)
}

variable "vpc_id" {
  description = "The id of the VPC"
  type        = string
}

variable "ingress_cidr_block" {
  description = "The cidr block for the ingress"
  type        = string
}

variable "bastion_sg_id" {
  type = string
}
