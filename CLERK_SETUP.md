# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your Nivasi.space room rental application using the official Clerk React SDK.

## Prerequisites

- A Clerk account (sign up at https://clerk.com)
- Node.js and npm installed
- Your React application running

## Step 1: Install Clerk React SDK

The Clerk React SDK is already installed in your project. If you need to reinstall:

```bash
npm install @clerk/clerk-react@latest
```

## Step 2: Create a Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Add Application"
3. Choose "React" as your framework
4. Give your application a name (e.g., "Nivasi Room Rental")
5. Select your preferred authentication methods (Email/Password recommended)

## Step 3: Configure Your Application

1. In your Clerk dashboard, go to your application settings
2. Navigate to "API Keys" in the sidebar
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root (preferred for local development)
2. Add your Clerk publishable key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

3. Replace `pk_test_your_actual_key_here` with your actual publishable key from Clerk

## Step 5: Configure Clerk Settings

### Email Templates
1. Go to "Email Templates" in your Clerk dashboard
2. Customize the sign-in and sign-up email templates
3. Update the branding to match your application

### User Management
1. Go to "Users" in your Clerk dashboard
2. Configure user attributes as needed
3. Set up any required user metadata

### Authentication Methods
1. Go to "Authentication" in your Clerk dashboard
2. Enable/disable authentication methods as needed:
   - Email/Password (recommended)
   - Social providers (Google, Facebook, etc.)
   - Phone number authentication

## Step 6: Test Your Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your application
3. Click the "Sign Up" or "Sign In" buttons
4. Test the authentication flow

## Implementation Details

### Main App Setup (`src/main.jsx`)
```jsx
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ClerkProvider>
  </StrictMode>,
);
```

### Authentication Components in App
```jsx
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

// In your component:
<SignedOut>
  <SignInButton mode="modal">
    <Button>Sign In</Button>
  </SignInButton>
  <SignUpButton mode="modal">
    <Button>Sign Up</Button>
  </SignUpButton>
</SignedOut>
<SignedIn>
  <UserButton />
</SignedIn>
```

## Features Included

### Official Clerk Components
- **SignInButton**: Pre-built sign-in button with modal
- **SignUpButton**: Pre-built sign-up button with modal
- **UserButton**: Pre-built user profile dropdown
- **SignedIn/SignedOut**: Conditional rendering based on auth state

### Security Features
- Built-in form validation
- Error handling
- Loading states
- Secure authentication flow
- Automatic session management

### User Experience
- Responsive design
- Loading spinners
- Error messages
- Smooth transitions
- Multi-language support integration

## Customization

### Styling
The Clerk components can be customized using the `appearance` prop:

```jsx
<UserButton 
  appearance={{
    elements: {
      avatarBox: "w-8 h-8",
      userButtonTrigger: "bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
    }
  }}
/>
```

### Language Support
The components integrate with your existing language system. Add translations for:
- `signIn`
- `signUp`
- `signOut`
- `email`
- `password`
- `firstName`
- `lastName`
- `confirmPassword`
- `settings`

## Step 7: Production Deployment

### Environment Variables
Make sure to set the production environment variables in your hosting platform:

- **Vercel**: Add `VITE_CLERK_PUBLISHABLE_KEY` in your project settings
- **Netlify**: Add the environment variable in your site settings
- **Other platforms**: Add the environment variable according to your platform's documentation

### Clerk Production Settings
1. In your Clerk dashboard, switch to "Production" mode
2. Update your production domain in the Clerk settings
3. Use the production publishable key in your environment variables

## Troubleshooting

### Common Issues

1. **"Missing Publishable Key" error**
   - Ensure your `.env.local` file exists and contains the correct key
   - Restart your development server after adding the environment variable

2. **Authentication not working**
   - Check your Clerk dashboard settings
   - Verify your domain is correctly configured
   - Check browser console for errors

3. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Use the `appearance` prop to customize Clerk components

### Getting Help

- [Clerk React Quickstart](https://clerk.com/docs/quickstarts/react)
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Support](https://clerk.com/support)

## Security Best Practices

1. **Never expose your secret key** in client-side code
2. **Use environment variables** for all sensitive configuration
3. **Enable HTTPS** in production
4. **Regularly update dependencies**
5. **Monitor authentication logs** in your Clerk dashboard

## Next Steps

After setting up authentication, consider implementing:

1. **Protected Routes**: Use `<SignedIn>` and `<SignedOut>` for conditional rendering
2. **User Roles**: Implement admin/user role management using Clerk's user metadata
3. **Profile Management**: Allow users to update their information through Clerk's dashboard
4. **Email Verification**: Configure email verification in your Clerk dashboard
5. **Password Reset**: Enable password reset functionality in your Clerk dashboard 