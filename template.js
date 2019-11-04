const template = ({ city, temp, sunUp, sunSet, icon, weatherType }) => `
<article>
<h1>${city}</h1>
${Math.round(temp)}
${sunUp}
${sunSet}
${icon}
${weatherType}
</article>`;
