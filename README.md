![Build Status](https://github.com/Doszhan-M/video.hosting/actions/workflows/ci_testing.yml/badge.svg)


# Video Hub
<br>


## Requirements for the project:
- search and view videos uploaded by users;
- registration and authorization of users;
- adding and managing videos - by registered users;
- communication of users with each other through chats (LAN and group);
- sending notifications through various communication channels.
<br>
<br>


## Basic entity fields in the database:

### Video:
```
channel - the channel to which the video belongs
title - video title
video_file - link to the file
description - description
upload_date - upload date
```

### User:
```
sub - identifier from Auth0
phone - phone number
email - email
is_banned - user ban
```

### Channel:
```
user - the user who owns the channel
title - channel name
description - channel description
subscribers - channel subscriber
```
### Comment:
```
text - text
user - the user who owns the comment
video - the video the comment belongs to
create - publication date
```
### Subscription:
```
user - the user who is subscribed to the channel
channel - the channel to which the subscription belongs
```

### Like:
```
user - пользователь, который оставил лайк
video - видео к которому относиться лайк
```
<br>
<br>

# Development of the REST API schema:
## Required API Methods
### swagger: http://hostname/swagger/

<br>

### Users:
- login for Auth0
- logout for Auth0
- get csrf
- check active session
- user info
- also connect djoser, if necessary, jwt authorization
<br>

### Video:
- video search
- list of all videos (pagination, fresh at the beginning)
- get video by id
- upload video
- delete video (owner)
- editing video meta data (owner)
- rate the video (like)
- create comments on video
- list of all comments on the video (fresh at the beginning)
- subscribe to the channel
- list of videos from subscriptions (pagination)
- 
### Chat:
- creating a room between users
- list of posts from history for chat by id

<br>
<br>

# websocket:
- raise a separate service on fastapi
### swagger: http://hostname/websocket/docs

### Chat:
- group chat
- creating a private room between 2 users
- list of posts from history for chat by room id
  
The history is stored in the database:
### Model:
   ```
   user - sender
   index - serial number in the chat
   message - message body
  ```


# Frontend:

- raise a separate service on react js
- connect react-redux
- set up pwa application
