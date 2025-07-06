variable "subnet_ids" {
  type = list(string)
}

variable "project" {
  description = "The name of the project"
  type        = string
}

variable "vpc_id" {
  type = string
}
