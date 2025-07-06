# module "ses" {
#   source              = "./ses"
#   ses_email_sender    = var.ses_email_sender
#   ses_domain_identity = var.domain_name
# }

module "network" {
  source              = "./network"
  project             = var.project
  vpc_cidr_block      = "10.0.0.0/16"
  vpc_public_subnets  = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]
  vpc_private_subnets = ["10.0.100.0/24", "10.0.101.0/24", "10.0.102.0/24"]
}

module "postgres" {
  source             = "./postgres"
  project            = var.project
  private_subnet_ids = module.network.private_subnet_ids
  vpc_id             = module.network.vpc_id
  ingress_cidr_block = module.network.vpc_cidr_block
  bastion_sg_id      = module.bastion.ec2_sg_id
}

module "budgets" {
  source              = "./budgets"
  billing_alarm_email = var.billing_alarm_email
}

module "bastion" {
  source  = "./bastion"
  project = var.project
  vpc_id  = module.network.vpc_id
  subnet  = module.network.public_subnet_ids[0]
}

module "cognito" {
  source      = "./cognito"
  project     = var.project
  domain_name = var.domain_name
}

# module "ec2" {
#   source     = "./ec2"
#   project    = var.project
#   subnet_ids = module.network.private_subnet_ids
#   vpc_id     = module.network.vpc_id
#   depends_on = [module.network]
# }
