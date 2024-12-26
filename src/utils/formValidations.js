export const validateCompanyForm = (name, location, emails, phoneNumbers, linkedinProfile, communicationPeriodicity) => {
    let valid = true;
    let invalid = {
        name: false,
        location: false,
        email: false,
        phone: false,
        linkedinProfile: false,
        communicationPeriodicity: false,
    };

    // Check for empty fields
    if (!name) {
        valid = false;
        invalid.name = true;
    }
    if (!location) {
        valid = false;
        invalid.location = true;
    }
    
    // Validate emails
    if (!emails.length || emails.some(email => !email)) {
        valid = false;
        invalid.email = 'At least one email is required';
    } else {
      const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emails.some(email => !emailRegEx.test(email))) {
          valid = false;
          invalid.email = 'Enter a valid email address';
      }
   }

   // Validate phone numbers
   if (!phoneNumbers.length || phoneNumbers.some(phone => !phone)) {
       valid = false;
       invalid.phone = 'At least one phone number is required';
   } else {
       const phoneRegEx = /^\d{10}$/; // Assuming US phone number format
       if (phoneNumbers.some(phone => !phoneRegEx.test(phone))) {
           valid = false;
           invalid.phone = 'Enter a valid phone number';
       }
   }

   // Validate LinkedIn profile URL
   const linkedinRegEx = /^(http(s)?:\/\/)?(www\.)?linkedin\.com\/(pub|in|profile|company)\/([-a-zA-Z0-9]+)\/*/;
   if (linkedinProfile && !linkedinRegEx.test(linkedinProfile)) {
       valid = false;
       invalid.linkedinProfile = 'Enter a valid LinkedIn profile URL';
   }

   // Check for communication periodicity
   if (!communicationPeriodicity) {
       valid = false;
       invalid.communicationPeriodicity = true;
   }

   return {
       valid,
       invalid,
   };
};
