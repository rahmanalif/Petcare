# Navbar Authentication States

## Overview
The Navbar now displays different navigation items based on the user's authentication state, matching your design requirements.

## Before Authentication (Not Logged In)

**Navigation Items:**
- Home
- Services
- Become a sitter
- FAQ's

**Right Side:**
- "Sign Up" button (coral/red color)

## After Authentication (Logged In)

**Navigation Items:**
- Home
- Create service
- Bookings

**Right Side:**
- "Logout" link
- User avatar (circular profile picture)
  - Shows user's profile image if available
  - Shows first letter of username as fallback with gradient background

## Implementation Details

### User Avatar Features
- **With Profile Image:** Displays the user's avatar image
- **Without Profile Image:** Shows the first letter of the user's name in a gradient circle (teal to blue)
- **Hover Effect:** Shadow appears on hover
- **Fallback:** Shows "U" if no username is available

### Navigation Logic
The component uses Redux state to determine what to display:

```javascript
const { isAuthenticated, user } = useSelector((state) => state.auth);

// Show different nav items based on isAuthenticated
{isAuthenticated ? (
  // Show: Create service, Bookings
) : (
  // Show: Services, Become a sitter, FAQ's
)}
```

### Avatar Display Logic
```javascript
{user?.avatar ? (
  // Display user's profile image
  <Image src={user.avatar} ... />
) : (
  // Display first letter of name
  <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
)}
```

## File Updated
- [component/global/Navbar.jsx](component/global/Navbar.jsx)

## Adding User Avatar

To add a user's profile picture, update the user data in the login/signup handlers:

```javascript
const userData = {
  user: {
    id: '1',
    name: formData.username,
    email: formData.username,
    avatar: '/path/to/avatar.jpg' // Add this
  },
  role: 'pet_owner'
};
```

## Testing

1. **Not Logged In:**
   - Visit `http://localhost:3000/`
   - Should see: Home, Services, Become a sitter, FAQ's, Sign Up button

2. **After Login:**
   - Click "Sign Up" → Login
   - Enter any username
   - After login, should see: Home, Create service, Bookings, Logout, Avatar
   - Avatar should show first letter of your username

3. **Logout:**
   - Click "Logout"
   - Should return to the non-authenticated navbar state
