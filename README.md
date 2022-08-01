# This Role Changik App

Create a tiny server app based on Node.js.

The app should implement simple organization user structure management operations.
The following user roles should be supported:
a. Administrator (top-most user)
b. Boss (any user with at least 1 subordinate)
c. Regular user (user without subordinates)

Each user except the Administrator must have a boss (strictly one).
The following REST API endpoints should be exposed:
- [x] Register user
- [x] Authenticate as a user
- [ ] Return list of users, taking into account the following:
  - [x] administrator should see everyone
  - [ ] boss should see herself and all subordinates (recursively)
  - [x] regular user can see only herself
- [ ] Change user's boss (only boss can do that and only for her subordinates)