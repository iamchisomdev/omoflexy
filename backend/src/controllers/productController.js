import { supabase } from "../config/supabase.js";

export const testingMethod = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Testing method works!",
  });
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();

    let dbQuery = supabase.from("products").select("*");

    if (q) {
      const like = `%${q}%`;
      dbQuery = dbQuery.or(
        `product_name.ilike.${like},description.ilike.${like},category.ilike.${like}`,
      );
    }

    const { data, error } = await dbQuery.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create product (Admin)
export const createProduct = async (req, res) => {
  console.log("=== DEBUG INFO ===");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("==================");

  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "No data received",
      });
    }

    const { product_name, quantity, category, price, description, colors } = req.body;
    const files = req.files || [];

    // Validate required fields
    if (!product_name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: product_name, category, price are required",
      });
    }

    // Parse colors JSON string into JS array
    let colorsArray = [];
    if (colors) {
      try {
        colorsArray = JSON.parse(colors);
        if (!Array.isArray(colorsArray)) {
          throw new Error("Colors must be an array");
        }
      } catch (err) {
        console.warn("Failed to parse colors:", err.message);
        colorsArray = [];
      }
    }

    let imageUrls = [];

    // Upload images to Supabase
    if (files.length > 0) {
      console.log(`Uploading ${files.length} image(s)...`);

      for (const file of files) {
        const fileName = `products/${Date.now()}-${file.originalname}`;
        console.log(`Uploading file: ${fileName}`);

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue; // skip failed uploads
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) imageUrls.push(urlData.publicUrl);
        console.log(`Image uploaded: ${urlData?.publicUrl}`);
      }
    }

    console.log("Inserting product into database...");

    const insertPayload = {
      product_name,
      category,
      price: parseFloat(price),
      description,
      colors: colorsArray, // ✅ store JS array into Postgres text[]
    };

    if (quantity) insertPayload.quantity = parseInt(quantity);
    if (imageUrls.length > 0) insertPayload.product_images = imageUrls;

    const { data, error } = await supabase
      .from("products")
      .insert([insertPayload])
      .select();

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Product created successfully:", data[0]);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("=== ERROR IN createProduct ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("==============================");

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// Update product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
