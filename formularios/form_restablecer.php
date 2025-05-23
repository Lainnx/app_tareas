<?php

if(!$_SESSION['id_reset']) {
header('location: index.php');
exit();
}
?>

<form name="formRestablecer">
<fieldset>
<h2>Introduce la nueva contraseña</h2>
<div>
    <label for="password1">Nueva contraseña:</label>
    <!-- Acuerdate de poner el required  -->
    <input type="password" name="password1" id="password1" required maxlength="12">
</div>
<div>
    <label for="password2">Contraseña:</label>
    <!-- Acuerdate de poner el required  -->
    <input type="password" name="password2" id="password2" required maxlength="12">
    <p id="errorPassword"></p>
</div>

<div>
    <button type="submit">Acceder</button>
    <button type="reset">Borrar formulario</button>   
</div>

</fieldset>

</form>