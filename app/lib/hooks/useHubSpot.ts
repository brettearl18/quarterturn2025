import { useState } from 'react';
import { HubSpotService } from '../services/hubspot';
import { useAuth } from './useAuth';

export function useHubSpot() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createOrUpdateContact = async (properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    type: 'vendor' | 'customer';
    company?: string;
  }) => {
    try {
      setLoading(true);
      const existingContact = await HubSpotService.getContactByEmail(properties.email);
      
      if (existingContact) {
        return await HubSpotService.updateContact(existingContact.id, properties);
      } else {
        return await HubSpotService.createContact(properties);
      }
    } catch (error) {
      console.error('Error in createOrUpdateContact:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createVendorProfile = async (companyName: string, vendorId: string) => {
    try {
      setLoading(true);
      const company = await HubSpotService.createVendorCompany(companyName, vendorId);
      
      if (user?.email) {
        await createOrUpdateContact({
          email: user.email,
          type: 'vendor',
          company: companyName
        });
      }

      return company;
    } catch (error) {
      console.error('Error in createVendorProfile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const trackPurchase = async (amount: number, productName: string) => {
    try {
      setLoading(true);
      if (!user?.email) throw new Error('User not authenticated');

      const contact = await HubSpotService.getContactByEmail(user.email);
      if (!contact) throw new Error('Contact not found in HubSpot');

      await HubSpotService.createDeal(contact.id, amount, `Purchase: ${productName}`);
      await HubSpotService.trackEvent(contact.id, 'purchase_completed', {
        amount,
        productName,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in trackPurchase:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const trackVendorActivity = async (eventName: string, properties: Record<string, any>) => {
    try {
      setLoading(true);
      if (!user?.email) throw new Error('User not authenticated');

      const contact = await HubSpotService.getContactByEmail(user.email);
      if (!contact) throw new Error('Contact not found in HubSpot');

      await HubSpotService.trackEvent(contact.id, eventName, {
        ...properties,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in trackVendorActivity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createOrUpdateContact,
    createVendorProfile,
    trackPurchase,
    trackVendorActivity
  };
} 