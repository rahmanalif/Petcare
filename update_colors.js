const fs = require('fs');
const path = 'component/Search/Hero.jsx';
const fullPath = require('path').resolve(path);

try {
    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Replace the primary brand color (includes text, bg, border, fill)
    // Matches #035F75 and replaces with #024B5E
    content = content.split('#035F75').join('#024B5E');

    // 2. Replace the dark gray text color/fill
    // Matches #585858 and replaces with #024B5E
    content = content.split('#585858').join('#024B5E');

    // 3. Replace Tailwind text colors
    const textColors = [
        'text-gray-700',
        'text-gray-600',
        'text-gray-500',
        'text-gray-400',
        'text-black'
    ];

    textColors.forEach(color => {
        // Use split/join for global replacement
        content = content.split(color).join('text-[#024B5E]');
    });

    // 4. Add text color to the main container div if not already present
    // Look for the specific line 221 pattern
    const mainDivSearch = 'className="min-h-screen bg-[#F8F4EF] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6"';
    const mainDivReplace = 'className="min-h-screen bg-[#F8F4EF] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 text-[#024B5E]"';

    if (content.includes(mainDivSearch)) {
        content = content.replace(mainDivSearch, mainDivReplace);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Successfully updated colors in ' + fullPath);

} catch (err) {
    console.error('Error updating file:', err);
    process.exit(1);
}
