from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, mobile_no, user_type, address=None, is_status=False, password=None):
        """
        Creates and saves a User with the given email, name, and password.
        """
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            mobile_no=mobile_no,
            user_type=user_type,
            address=address,
            is_status=is_status
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, mobile_no, user_type='SuperAdmin', password=None):
        """
        Creates and saves a superuser with the given email, name, and password.
        """
        user = self.create_user(
            email=email,
            name=name,
            mobile_no=mobile_no,
            user_type=user_type,
            address="Default Address",  # Provide a default value
            is_status=True,  # Superusers should generally be active
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user