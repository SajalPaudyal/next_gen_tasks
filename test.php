<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Management</title>
</head>
<body>

<h2>Manage Products</h2>

<!-- Form for creating/updating products -->
<form action="" method="POST">
    <input type="hidden" name="id" value="<?php echo isset($product["id"])
        ? $product["id"]
        : ""; ?>">
    <label for="name">Product Name:</label>
    <input type="text" name="name" required value="<?php echo isset(
        $product["name"]
    )
        ? $product["name"]
        : ""; ?>">
    <br>
    <label for="description">Description:</label>
    <textarea name="description"><?php echo isset($product["description"])
        ? $product["description"]
        : ""; ?></textarea>
    <br>
    <label for="price">Price:</label>
    <input type="number" step="0.01" name="price" required value="<?php echo isset(
        $product["price"]
    )
        ? $product["price"]
        : ""; ?>">
    <br>
    <label for="quantity">Quantity:</label>
    <input type="number" name="quantity" required value="<?php echo isset(
        $product["quantity"]
    )
        ? $product["quantity"]
        : ""; ?>">
    <br><br>
    <button type="submit" name="<?php echo isset($product["id"])
        ? "update"
        : "create"; ?>">
        <?php echo isset($product["id"]) ? "Update Product" : "Add Product"; ?>
    </button>
</form>

<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "shop_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle Create operation
if (isset($_POST["create"])) {
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];
    $conn->query(
        "INSERT INTO product (name, description, price, quantity) VALUES ('$name', '$description', $price, $quantity)"
    );
    header("Location: products.php");
}

// Handle Read (fetch all products)
$result = $conn->query("SELECT * FROM product");

// Handle Update operation
if (isset($_GET["edit"])) {
    $id = $_GET["edit"];
    $result = $conn->query("SELECT * FROM product WHERE id=$id");
    $product = $result->fetch_assoc();
}

if (isset($_POST["update"])) {
    $id = $_POST["id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];
    $conn->query(
        "UPDATE product SET name='$name', description='$description', price=$price, quantity=$quantity WHERE id=$id"
    );
    header("Location: products.php");
}

// Handle Delete operation
if (isset($_GET["delete"])) {
    $id = $_GET["delete"];
    $conn->query("DELETE FROM product WHERE id=$id");
    header("Location: products.php");
}
?>

<h2>Product List</h2>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Actions</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row["id"]; ?></td>
            <td><?php echo $row["name"]; ?></td>
            <td><?php echo $row["description"]; ?></td>
            <td><?php echo $row["price"]; ?></td>
            <td><?php echo $row["quantity"]; ?></td>
            <td>
                <a href="?edit=<?php echo $row["id"]; ?>">Edit</a> |
                <a href="?delete=<?php echo $row[
                    "id"
                ]; ?>" onclick="return confirm('Are you sure?')">Delete</a>
            </td>
        </tr>
    <?php endwhile; ?>
</table>
