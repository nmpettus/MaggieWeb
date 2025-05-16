// src/utils/api.ts

const API_BASE_URL = 'https://booksbymaggie.com/api';

// Types for our API responses
interface ApiResponse {
  success: boolean;
  error?: string;
}

// Types for our request data
interface LetterData {
  name: string;
  email: string;
  message: string;
}

interface NewsletterData {
  email: string;
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Functions
export async function sendLetterToMaggie(data: LetterData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/letter-to-maggie.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function subscribeToNewsletter(data: NewsletterData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/newsletter.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function sendContactForm(data: ContactData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/contact.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
