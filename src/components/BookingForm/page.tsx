'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from './validationSchema';
import { z } from 'zod';

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Your request has been submitted successfully!');
    } else {
      alert('There was a problem submitting your request.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 mx-40'>
      <input
        type="text"
        placeholder="First Name"
        {...register('firstName')}
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        type="text"
        placeholder="Last Name"
        {...register('lastName')}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input
        type="email"
        placeholder="Work Email"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="tel"
        placeholder="Phone Number"
        {...register('phone')}
      />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input
        type="text"
        placeholder="Company Name"
        {...register('companyName')}
      />
      {errors.companyName && <p>{errors.companyName.message}</p>}

      <input
        type="text"
        placeholder="Company Title"
        {...register('companyTitle')}
      />
      {errors.companyTitle && <p>{errors.companyTitle.message}</p>}

      <input
        type="text"
        placeholder="Your Industry"
        {...register('industry')}
      />
      {errors.industry && <p>{errors.industry.message}</p>}

      <input
        type="text"
        placeholder="Country"
        {...register('country')}
      />
      {errors.country && <p>{errors.country.message}</p>}

      <input
        type="text"
        placeholder="Where did you hear about us?"
        {...register('hearAboutUs')}
      />
      {errors.hearAboutUs && <p>{errors.hearAboutUs.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
