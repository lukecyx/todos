data "aws_availability_zones" "available" {}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  assign_generated_ipv6_cidr_block = true

  tags = {
    Name = "${var.project}_vpc"
  }

}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project}_igw"
  }
}

# AZ 1
resource "aws_subnet" "public_az1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_public_subnets[0]
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.project}_public_subnet_az1"
  }
}

resource "aws_subnet" "private_az1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_private_subnets[0]
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${var.project}_private_subnet_az1"
  }
}

# AZ 2
resource "aws_subnet" "public_az2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_public_subnets[1]
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${var.project}_public_subnet_az2"
  }
}

resource "aws_subnet" "private_az2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_private_subnets[1]
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${var.project}_private_subnet_az2"
  }
}

# AZ 3
resource "aws_subnet" "public_az3" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_public_subnets[2]
  availability_zone = data.aws_availability_zones.available.names[2]


  tags = {
    Name = "${var.project}_public_subnet_az3"
  }
}

resource "aws_subnet" "private_az3" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_private_subnets[2]
  availability_zone = data.aws_availability_zones.available.names[2]

  tags = {
    Name = "${var.project}_private_subnet_az3"
  }
}


resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project}_route_table"
  }
}

resource "aws_route" "vpc_public_route" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_route_table_association" "public_az1" {
  subnet_id      = aws_subnet.public_az1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_az2" {
  subnet_id      = aws_subnet.public_az2.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_az3" {
  subnet_id      = aws_subnet.public_az3.id
  route_table_id = aws_route_table.public.id
}

# NAT
resource "aws_eip" "nat_eip" {
  domain     = "vpc"
  depends_on = [aws_internet_gateway.igw]

  tags = {
    Name = "${var.project}_nat_eip"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_az1.id
  depends_on    = [aws_internet_gateway.igw]
  tags = {
    Name = "${var.project}_nat"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project}_private_route_table"
  }
}

resource "aws_route" "vpc_private_route" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat.id
}

resource "aws_route_table_association" "private_az1" {
  subnet_id      = aws_subnet.private_az1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_az2" {
  subnet_id      = aws_subnet.private_az2.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_az3" {
  subnet_id      = aws_subnet.private_az3.id
  route_table_id = aws_route_table.private.id
}

