module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);

    const plugins = [
        process.env.NODE_ENV === 'development' && 'react-refresh/babel',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-proposal-optional-chaining',
        'regenerator-runtime/runtime', // для поддержки async/await
    ].filter(Boolean);

    return {
        presets: [
            '@babel/preset-env',       // Поддержка современных стандартов JS
            '@babel/preset-react',     // Преобразование JSX в React
            '@babel/preset-typescript', // Поддержка TypeScript
        ],
        plugins,
    }
};
