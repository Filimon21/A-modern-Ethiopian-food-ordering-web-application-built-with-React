export function validateCheckout(form) {
  const errors = {};

  if (!form.fullName?.trim()) {
    errors.fullName = "Full name is required.";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!form.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[0-9+\-\s()]{9,20}$/.test(form.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!form.address?.trim()) {
    errors.address = "Delivery address is required.";
  } else if (form.address.trim().length < 5) {
    errors.address = "Please enter a more complete address.";
  }

  if (!form.area) {
    errors.area = "Please select your delivery area.";
  }

  if (!form.paymentMethod) {
    errors.paymentMethod = "Please select a payment method.";
  }

  return errors;
}