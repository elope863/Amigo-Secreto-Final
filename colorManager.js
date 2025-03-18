let colorManager = {
    randomColor: function() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    getContrast: function(hex) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
    },
    updateColors: function() {
        const bgColor = this.randomColor();
        const textColor = this.getContrast(bgColor);
        
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = textColor;
        
        document.querySelectorAll('button, .main-title, .section-title').forEach(el => {
            el.style.color = textColor;
        });
    }
};

export default colorManager;
