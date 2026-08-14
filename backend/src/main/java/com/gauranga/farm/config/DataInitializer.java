package com.gauranga.farm.config;

import com.gauranga.farm.model.Product;
import com.gauranga.farm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing products to allow fresh seeding
        productRepository.deleteAll();

        List<Product> products = Arrays.asList(
                // 25 VEGETABLES
                new Product(null, "Organic Cauliflower", "vegetables", new BigDecimal("60"), "/ kg", "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop"),
                new Product(null, "Farm Fresh Eggplant", "vegetables", new BigDecimal("40"), "/ kg", "https://image.pollinations.ai/prompt/Farm%20Fresh%20Eggplant?width=400&height=300&nologo=true"),
                new Product(null, "Organic Bell Peppers", "vegetables", new BigDecimal("120"), "/ kg", "https://image.pollinations.ai/prompt/Organic%20Bell%20Peppers?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Green Chilies", "vegetables", new BigDecimal("80"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Green%20Chilies?width=400&height=300&nologo=true"),
                new Product(null, "Organic Ginger", "vegetables", new BigDecimal("150"), "/ kg", "https://image.pollinations.ai/prompt/Organic%20Ginger?width=400&height=300&nologo=true"),
                new Product(null, "Organic Tomatoes", "vegetables", new BigDecimal("50"), "/ kg", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop"),
                new Product(null, "Farm Fresh Potatoes", "vegetables", new BigDecimal("35"), "/ kg", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop"),
                new Product(null, "Organic Onions", "vegetables", new BigDecimal("45"), "/ kg", "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Spinach", "vegetables", new BigDecimal("30"), "/ bunch", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop"),
                new Product(null, "Crunchy Carrots", "vegetables", new BigDecimal("60"), "/ kg", "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop"),
                new Product(null, "Organic Broccoli", "vegetables", new BigDecimal("180"), "/ kg", "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop"),
                new Product(null, "Farm Fresh Cabbage", "vegetables", new BigDecimal("40"), "/ kg", "https://images.unsplash.com/photo-1596131448842-78d91c7848f1?w=400&h=300&fit=crop"),
                new Product(null, "Organic Garlic", "vegetables", new BigDecimal("200"), "/ kg", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Cucumber", "vegetables", new BigDecimal("50"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Cucumber?width=400&height=300&nologo=true"),
                new Product(null, "Organic Zucchini", "vegetables", new BigDecimal("90"), "/ kg", "https://image.pollinations.ai/prompt/Organic%20Zucchini?width=400&height=300&nologo=true"),
                new Product(null, "Tender Green Beans", "vegetables", new BigDecimal("80"), "/ kg", "https://image.pollinations.ai/prompt/Tender%20Green%20Beans?width=400&height=300&nologo=true"),
                new Product(null, "Farm Fresh Green Peas", "vegetables", new BigDecimal("100"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Green%20Peas?width=400&height=300&nologo=true"),
                new Product(null, "Bitter Gourd (Karela)", "vegetables", new BigDecimal("60"), "/ kg", "https://image.pollinations.ai/prompt/Bitter%20Gourd?width=400&height=300&nologo=true"),
                new Product(null, "Bottle Gourd (Lauki)", "vegetables", new BigDecimal("40"), "/ kg", "https://image.pollinations.ai/prompt/Bottle%20Gourd?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Okra (Bhindi)", "vegetables", new BigDecimal("70"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Okra?width=400&height=300&nologo=true"),
                new Product(null, "Organic Pumpkin", "vegetables", new BigDecimal("35"), "/ kg", "https://images.unsplash.com/photo-1509622905156-f6bc18ebc916?w=400&h=300&fit=crop"),
                new Product(null, "Sweet Potato", "vegetables", new BigDecimal("50"), "/ kg", "https://image.pollinations.ai/prompt/Sweet%20Potato?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Radish (Mooli)", "vegetables", new BigDecimal("40"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20White%20Radish?width=400&height=300&nologo=true"),
                new Product(null, "Organic Beetroot", "vegetables", new BigDecimal("60"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Beetroot?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Mint Leaves", "vegetables", new BigDecimal("20"), "/ bunch", "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=300&fit=crop"),

                // 25 FRUITS
                new Product(null, "Organic Pomegranate", "fruits", new BigDecimal("150"), "/ kg", "https://image.pollinations.ai/prompt/Organic%20Pomegranate?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Guava", "fruits", new BigDecimal("80"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Guava%20Fruit?width=400&height=300&nologo=true"),
                new Product(null, "Farm Fresh Grapes", "fruits", new BigDecimal("120"), "/ kg", "https://image.pollinations.ai/prompt/Farm%20Fresh%20Grapes?width=400&height=300&nologo=true"),
                new Product(null, "Organic Pineapple", "fruits", new BigDecimal("90"), "/ piece", "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop"),
                new Product(null, "Sweet Bananas", "fruits", new BigDecimal("60"), "/ dozen", "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=300&fit=crop"),
                new Product(null, "Alphonso Mangoes", "fruits", new BigDecimal("400"), "/ kg", "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop"),
                new Product(null, "Kashmiri Apples", "fruits", new BigDecimal("200"), "/ kg", "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=400&h=300&fit=crop"),
                new Product(null, "Nagpur Oranges", "fruits", new BigDecimal("100"), "/ kg", "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400&h=300&fit=crop"),
                new Product(null, "Organic Papaya", "fruits", new BigDecimal("60"), "/ piece", "https://image.pollinations.ai/prompt/Fresh%20Papaya?width=400&height=300&nologo=true"),
                new Product(null, "Juicy Watermelon", "fruits", new BigDecimal("40"), "/ kg", "https://images.unsplash.com/photo-1587049352847-4d4b1a43a05f?w=400&h=300&fit=crop"),
                new Product(null, "Sweet Muskmelon", "fruits", new BigDecimal("50"), "/ kg", "https://image.pollinations.ai/prompt/Muskmelon?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Strawberries", "fruits", new BigDecimal("250"), "/ box", "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop"),
                new Product(null, "Organic Blueberries", "fruits", new BigDecimal("350"), "/ box", "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Kiwi", "fruits", new BigDecimal("150"), "/ pack", "https://images.unsplash.com/photo-1585059895524-72359e06138a?w=400&h=300&fit=crop"),
                new Product(null, "Hass Avocado", "fruits", new BigDecimal("200"), "/ piece", "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Lemon", "fruits", new BigDecimal("80"), "/ kg", "https://images.unsplash.com/photo-1590502593747-42298799482d?w=400&h=300&fit=crop"),
                new Product(null, "Green Pear (Nashpati)", "fruits", new BigDecimal("120"), "/ kg", "https://images.unsplash.com/photo-1614812678680-e8869c9b360f?w=400&h=300&fit=crop"),
                new Product(null, "Juicy Peach", "fruits", new BigDecimal("180"), "/ kg", "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Plum", "fruits", new BigDecimal("160"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Plum?width=400&height=300&nologo=true"),
                new Product(null, "Sweet Cherries", "fruits", new BigDecimal("300"), "/ box", "https://images.unsplash.com/photo-1528820600606-0ef5600cbfee?w=400&h=300&fit=crop"),
                new Product(null, "Custard Apple (Sitaphal)", "fruits", new BigDecimal("120"), "/ kg", "https://image.pollinations.ai/prompt/Custard%20Apple%20Fruit?width=400&height=300&nologo=true"),
                new Product(null, "Sapota (Chikoo)", "fruits", new BigDecimal("70"), "/ kg", "https://image.pollinations.ai/prompt/Sapota%20Chikoo?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Lychee", "fruits", new BigDecimal("200"), "/ kg", "https://image.pollinations.ai/prompt/Fresh%20Lychee?width=400&height=300&nologo=true"),
                new Product(null, "Dragon Fruit", "fruits", new BigDecimal("150"), "/ piece", "https://image.pollinations.ai/prompt/Dragon%20Fruit?width=400&height=300&nologo=true"),
                new Product(null, "Organic Fig (Anjeer)", "fruits", new BigDecimal("250"), "/ box", "https://image.pollinations.ai/prompt/Fresh%20Figs?width=400&height=300&nologo=true"),

                // 10 DAIRY PRODUCTS
                new Product(null, "A2 Cow Ghee", "dairy", new BigDecimal("3315"), "/ 1 KG", "/images/gheeimage.png"),
                new Product(null, "Fresh Cow Milk", "dairy", new BigDecimal("80"), "/ 1L", "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop"),
                new Product(null, "Organic Butter", "dairy", new BigDecimal("450"), "/ 500g", "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&h=300&fit=crop"),
                new Product(null, "Farm Fresh Cheese", "dairy", new BigDecimal("350"), "/ 200g", "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop"),
                new Product(null, "Probiotic Curd", "dairy", new BigDecimal("120"), "/ 500g", "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"),
                new Product(null, "Fresh Paneer", "dairy", new BigDecimal("300"), "/ 500g", "https://image.pollinations.ai/prompt/Fresh%20Paneer%20Cottage%20Cheese?width=400&height=300&nologo=true"),
                new Product(null, "Spiced Buttermilk", "dairy", new BigDecimal("40"), "/ 500ml", "https://image.pollinations.ai/prompt/Indian%20Buttermilk%20Chaas?width=400&height=300&nologo=true"),
                new Product(null, "Fresh Cream (Malai)", "dairy", new BigDecimal("250"), "/ 250g", "https://image.pollinations.ai/prompt/Fresh%20Dairy%20Cream%20Malai?width=400&height=300&nologo=true"),
                new Product(null, "Organic Mawa (Khoya)", "dairy", new BigDecimal("400"), "/ 500g", "https://image.pollinations.ai/prompt/Mawa%20Khoya%20Dairy?width=400&height=300&nologo=true"),
                new Product(null, "Flavored Yogurt", "dairy", new BigDecimal("60"), "/ 200g", "https://image.pollinations.ai/prompt/Fruit%20Yogurt%20Cup?width=400&height=300&nologo=true")
        );
        productRepository.saveAll(products);
        System.out.println("Database seeded with " + products.size() + " sample organic products.");
    }
}
