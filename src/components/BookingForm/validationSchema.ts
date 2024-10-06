import { z } from 'zod';

export const bookingSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  companyName: z.string().min(1, { message: 'Company name is required' }),
  companyTitle: z.string().min(1, { message: 'Company title is required' }),
  industry: z.string().min(1, { message: 'Industry is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  hearAboutUs: z.string().min(1, { message: 'Please let us know where you heard about us' }),
});
