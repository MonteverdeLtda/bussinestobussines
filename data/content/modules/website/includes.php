<?php 
/* CONFIG AND DEFAULT */
$this->include_template("/settings/site.php");
$this->include_template("/dashboard/index.php");
/* END CONFIG AND DEFAULT */

/* ACCOUNTS  */
$this->include_template("/accounts/lists.php");
$this->include_template("/accounts/create.php");
$this->include_template("/accounts/single.php");
$this->include_template("/accounts/single-edit.php");
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
#$this->include_template("/addresses/create.php");
$this->include_template("/addresses/single.php");
#$this->include_template("/addresses/single-edit.php");
/* END ADDRESSES */
