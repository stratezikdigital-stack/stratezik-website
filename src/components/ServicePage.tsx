import { serviceBodies, serviceChildBodies, servicesHubBody } from '../services/serviceContent'
import { ServicePageView } from './ServicePageView'

const clientBodies = {
  servicesHub: servicesHubBody,
  serviceBodies,
  serviceChildBodies,
}

const ServicePage = () => <ServicePageView clientBodies={clientBodies} />

export default ServicePage
