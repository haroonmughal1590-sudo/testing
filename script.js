document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Resource Configuration and Pricing Logic ---

    // Define RAM pricing (1GB = 40, 2GB = 80, 3GB = 120, etc.)
    const RAM_BASE_PRICE = 40;
    const RAM_UNLIMITED_PRICE = 500;
    // Base cost for storage/CPU is assumed to be 0 for simplicity, only RAM drives cost.
    const OTHER_RESOURCE_COST = 0; 

    const ramSlider = document.getElementById('ram-slider');
    const ramValueDisplay = document.getElementById('ram-value');
    const ramUnlimitedToggle = document.getElementById('ram-unlimited');
    const ramCostDisplay = document.getElementById('ram-cost');
    const totalPriceDisplay = document.getElementById('total-price');

    /**
     * Calculates the total price based on selected resources.
     * Currently, only RAM dictates the price.
     */
    function updatePricing() {
        let ramCost = 0;

        if (ramUnlimitedToggle.checked) {
            // Unlimited RAM price
            ramCost = RAM_UNLIMITED_PRICE;
            ramValueDisplay.textContent = 'Unlimited';
        } else {
            // Per-GB RAM price
            const ramGB = parseInt(ramSlider.value);
            ramCost = ramGB * RAM_BASE_PRICE;
            ramValueDisplay.textContent = ramGB + ' GB';
        }

        const totalPrice = ramCost + OTHER_RESOURCE_COST;
        
        // Update display elements
        ramCostDisplay.textContent = `PKR ${ramCost}`;
        totalPriceDisplay.textContent = totalPrice.toLocaleString(); // Format number with commas
    }

    // Event listeners for RAM changes
    ramSlider.addEventListener('input', () => {
        ramUnlimitedToggle.checked = false; // Uncheck unlimited when slider is moved
        ramSlider.disabled = false;
        updatePricing();
    });

    ramUnlimitedToggle.addEventListener('change', () => {
        if (ramUnlimitedToggle.checked) {
            ramSlider.disabled = true;
        } else {
            ramSlider.disabled = false;
        }
        updatePricing();
    });

    // Initialize the pricing when the page loads
    updatePricing(); 


    // --- 2. Other Resource Sliders (for display only) ---

    const sliders = [
        { id: 'storage-slider', valueId: 'storage-value', unit: ' GB' },
        { id: 'cpu-slider', valueId: 'cpu-value', unit: ' %' }
    ];

    sliders.forEach(s => {
        const slider = document.getElementById(s.id);
        const valueDisplay = document.getElementById(s.valueId);
        const unlimitedToggle = document.getElementById(s.id.replace('-slider', '-unlimited'));

        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value + s.unit;
            unlimitedToggle.checked = false;
        });
        
        unlimitedToggle.addEventListener('change', () => {
            if (unlimitedToggle.checked) {
                valueDisplay.textContent = 'Unlimited';
                slider.disabled = true;
            } else {
                slider.disabled = false;
                valueDisplay.textContent = slider.value + s.unit;
            }
        });
        // Initial load update
        valueDisplay.textContent = slider.value + s.unit;
    });


    // --- 3. Payment Details Display Logic ---

    const paymentButtons = document.querySelectorAll('.pay-btn');
    const accountDisplay = document.getElementById('account-display');

    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accountDetails = button.getAttribute('data-account');
            const method = button.classList.contains('jazzcash') ? 'JazzCash' : 'Easypaisa';
            
            // Set the new text
            accountDisplay.innerHTML = `<strong>${method} Account:</strong> ${accountDetails}`;
            
            // Optional: Highlight the selected button
            paymentButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

});