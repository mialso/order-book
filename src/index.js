window.onload = () => {
    const uiChunk = import('./ui/index');
    const storeChunk = import('./store/index');

    // TODO: try fetch initial data as well
    Promise.all([ uiChunk, storeChunk ])
        .then(([ ui, store ]) => {
            const appStore = store.configureStore({});
            ui.render(appStore);
        });
};
