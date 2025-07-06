variable "project" {
  description = "The name of the domain the VPC lives"
  type        = string
}

variable "vpc_cidr_block" {
  description = "The cidr block for main vpc"
  type        = string
}

variable "vpc_public_subnets" {
  description = "The ip addresses of the public subnets"
  type        = list(string)

}

variable "vpc_private_subnets" {
  description = "The ip addresses of the private subnets"
  type        = list(string)
}
