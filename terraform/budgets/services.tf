locals {
  aws_services = {
    RDS = {
      name         = "Amazon Relational Database Service"
      budget_limit = "5"
    }
    S3 = {
      name         = "Amazon Simple Storage Service"
      budget_limit = "5"
    }
    Route53 = {
      name         = "Amazon Route 53"
      budget_limit = "5"
    }
    SES = {
      name         = "Amazon Simple Email Service"
      budget_limit = "5"
    }
    Tax = {
      name         = "Tax"
      budget_limit = "20"
    }
    VPC = {
      name         = "Amazon Virtual Private Cloud"
      budget_limit = "5"
    }
    EC2 = {
      name         = "Amazon EC2"
      budget_limit = "5"
    }
  }
}
