# TicketingSystemClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description

Ticketing system webapp that lets logged in users view their opened tickets, edit them, close them and open new tickets.
Users can register on the platform using a username and a password.
Users can edit tickets based on some settings set up by the admin (the admin can choose if users can edit `customer name`, `ticket type` or `service type`.

The webapp was build using [Nebular](https://akveo.github.io/nebular/) UI library.

It uses JWT for authentication.

The backend is a .NET Core 2.2 Web API and can be found [here](https://github.com/s00190970/Ticketing-System).

## Default user

It comes with a default user with admin privileges (normal user rights + can edit the UI settings).
`username`: *admin*
`password`: *password123*

Every other user is created with normal user rights.
