// Import required modules
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Define route to generate image
app.get('/generate-image', async (req, res) => {
    try {
        // Make API request to OpenAI
        const response = await axios.post('https://api.openai.com/v1/images', {
        model: "dall-e-2", // Change this to dall-e-2
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
    }, {
        headers: {
            'Authorization': `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`
        }
    });

        // Get image URL from response
        const imageUrl = response.data.data[0].url;

        // Send image URL in response
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error in /generate-image:', error);
        res.status(500).json({ error: 'An error occurred while generating the image.' });
    }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(3000, () => console.log('Server is running on port 3000'));
