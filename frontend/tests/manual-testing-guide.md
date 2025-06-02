# Manual Testing Guide for Hotel Booking MERN Project

## Frontend Testing

### Client Side
- Navigate to Home page: Verify room listings load with images, names, prices.
- Click on a room: Verify Room Details page shows correct info and images.
- Book a room: Select dates and submit booking, verify success message.
- View My Bookings: Verify list of bookings, try canceling a booking.
- Login/Logout: Verify login page works, redirects based on role.

### Admin Side
- Login as admin: Verify access to admin dashboard.
- Manage Rooms: Add new room, edit existing room, delete room.
- View Users: Verify list of users loads correctly.
- View Bookings: Verify all bookings are listed with correct details.

### Navigation
- Verify all links and navigation menus work correctly.
- Verify responsive design on different screen sizes.

## Backend Testing

### API Endpoints
- Auth: Register, login, token validation.
- Rooms: CRUD operations with admin authorization.
- Bookings: Create booking, cancel booking, user bookings.
- Admin: View all users and bookings.

### Edge Cases
- Booking overlapping dates.
- Unauthorized access to admin routes.
- Invalid input data.

## Notes
- Use Postman or similar tool for API testing.
- Use browser developer tools to monitor network requests.
- Check console for errors or warnings.
