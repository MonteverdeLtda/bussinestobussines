<?php 
/* CONFIG AND DEFAULT */
$this->include_template("/settings/site.php");
$this->include_template("/dashboard/index.php");
/* END CONFIG AND DEFAULT */

/* ACCOUNTS  */
$this->include_template("/accounts/component-navigation-top.php");
$this->include_template("/accounts/lists.php");
$this->include_template("/accounts/create.php");
$this->include_template("/accounts/single.php");
$this->include_template("/accounts/single-edit.php");
$this->include_template("/accounts/single-contacts-lists.php");
$this->include_template("/accounts/single-contacts-single.php");
$this->include_template("/accounts/single-addresses-lists.php");
$this->include_template("/accounts/single-addresses-add.php");
$this->include_template("/accounts/single-addresses-single.php");
$this->include_template("/accounts/single-requests-lists.php");
$this->include_template("/accounts/single-requests-single.php");
$this->include_template("/accounts/single-requests-add.php");
$this->include_template("/accounts/single-requests-single-quotations-single.php");
$this->include_template("/accounts/single-requests-single-quotations-add.php");
$this->include_template("/accounts/single-requests-single-calendar-add.php");
$this->include_template("/accounts/single-requests-single-calendar-single.php");
$this->include_template("/accounts/single-calendar-lists.php");
/* END ACCOUNTS  */

/* CONTACTS */
$this->include_template("/contacts/lists.php");
$this->include_template("/contacts/list-accounts.php");
$this->include_template("/contacts/create.php");
$this->include_template("/contacts/single.php");
$this->include_template("/contacts/single-edit.php");
$this->include_template("/contacts/create-to-account.php");
/* END CONTACTS */

/* USERS */
$this->include_template("/users/lists.php");
$this->include_template("/users/create.php");
$this->include_template("/users/single.php");
$this->include_template("/users/single-edit.php");
/* END USERS */

/* PROFILES */
$this->include_template("/profiles/single-b2b.php");
/* END PROFILES */

/* ADDRESSES */
$this->include_template("/addresses/lists.php");
$this->include_template("/addresses/create.php");
$this->include_template("/addresses/single.php");
$this->include_template("/addresses/single-edit.php");
/* END ADDRESSES */

/* GALLERY */
$this->include_template("/media/gallery.php");
/* END GALLERY */

/* EMPLOYEES */
$this->include_template("/employees/component-navigation-top.php");
$this->include_template("/employees/create.php");
$this->include_template("/employees/lists.php");
$this->include_template("/employees/single-calendar.php");
$this->include_template("/employees/single-edit.php");
$this->include_template("/employees/single-family-list.php");
$this->include_template("/employees/single-family-add.php");
$this->include_template("/employees/single.php");
$this->include_template("/employees/single-contacts-list.php");
$this->include_template("/employees/single-contacts-add.php");
/* END EMPLOYEES */


/* DEPARTMENTS */
$this->include_template("/departments/lists.php");
$this->include_template("/departments/create.php");
$this->include_template("/departments/single-edit.php");
$this->include_template("/departments/single-managers-edit.php");
$this->include_template("/departments/single-managers-create.php");
/* END DEPARTMENTS */

/* SYSTEM */
$this->include_template("/system/types-identifications.php");
$this->include_template("/system/types-genders.php");
$this->include_template("/system/types-eps.php");
$this->include_template("/system/types-contacts.php");
$this->include_template("/system/types-bloods-rhs.php");
$this->include_template("/system/types-bloods.php");
$this->include_template("/system/types-banks.php");
$this->include_template("/system/types-letters-addresses.php");
$this->include_template("/system/types-charges.php");
/* END SYSTEM */

/* EVENTS */
$this->include_template("/events/lists.php");
/* END EVENTS */
