import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN });

interface ContactProperties {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  type: 'vendor' | 'customer';
  company?: string;
}

export class HubSpotService {
  static async createContact(properties: ContactProperties) {
    try {
      const response = await hubspotClient.crm.contacts.basicApi.create({
        properties: {
          ...properties,
          lifecycle_stage: properties.type === 'vendor' ? 'vendor' : 'customer'
        }
      });
      return response;
    } catch (error) {
      console.error('Error creating HubSpot contact:', error);
      throw error;
    }
  }

  static async updateContact(contactId: string, properties: Partial<ContactProperties>) {
    try {
      const response = await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties: properties
      });
      return response;
    } catch (error) {
      console.error('Error updating HubSpot contact:', error);
      throw error;
    }
  }

  static async createDeal(contactId: string, amount: number, dealName: string) {
    try {
      const response = await hubspotClient.crm.deals.basicApi.create({
        properties: {
          amount: amount.toString(),
          dealname: dealName,
          pipeline: 'default',
          dealstage: 'presentationscheduled'
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ category: 'HUBSPOT_DEFINED', typeId: 3 }]
          }
        ]
      });
      return response;
    } catch (error) {
      console.error('Error creating HubSpot deal:', error);
      throw error;
    }
  }

  static async getContactByEmail(email: string) {
    try {
      const response = await hubspotClient.crm.contacts.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email
          }]
        }]
      });
      return response.results[0];
    } catch (error) {
      console.error('Error searching HubSpot contact:', error);
      throw error;
    }
  }

  static async createVendorCompany(companyName: string, vendorId: string) {
    try {
      const response = await hubspotClient.crm.companies.basicApi.create({
        properties: {
          name: companyName,
          vendor_id: vendorId,
          industry: 'FITNESS_EQUIPMENT'
        }
      });
      return response;
    } catch (error) {
      console.error('Error creating HubSpot company:', error);
      throw error;
    }
  }

  static async trackEvent(contactId: string, eventName: string, properties: Record<string, any>) {
    try {
      await hubspotClient.events.send({
        eventName,
        contactId,
        properties
      });
    } catch (error) {
      console.error('Error tracking HubSpot event:', error);
      throw error;
    }
  }
} 