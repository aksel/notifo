# notifo
## Cross platform personalized notifications, reminders and memos

### Idea
I want to develop a system for sending myself notifications, reminders and memos.
I want to be able to send them from one device to another,
including a system for sending reminders through queues, e.g. send them to the first connected device.

#### MVP
Node.js with Socket.io for notifications, storing them in MongoDB.

Static HTML client-side.

### Motivation
My motivation for developing this system comes from three specific use cases.
 
**A) Notifications in set intervals, in scheduled time-frames.**

The reason I have S Health installed is for a specific feature.
If you stay still for too long, S Health sends you a push notification,
reminding you to move about for a bit.
As someone who works at a desk, I found this feature very helpful.
Every hour or so, it would prompt me to walk about for a bit.

In the latest version of S Health, this feature no longer exists. I want a replacement.

**B) Voice memos**

I have trouble falling asleep. It usually takes me about an hour or two.
It's in this period I come up with most of my ideas.
I have a notebook beside my bed, that I write them down in.
The problem is, that I have to sit up, and turn on the light, to write in the notebook.

I want to replace it with voice recordings, that I can send to my future self, sort of like voice-mail.

**C) Device-specific reminders**

I frequently use Google Now reminders, but find they are usually context specific.
Google Now has location-aware reminders, but it does not fit my specific use case.

As an example, *remember to send this email, when you get back to the desktop computer*,
or *remember to read X article when you get back to the work laptop*.


