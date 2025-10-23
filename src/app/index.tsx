import React from 'react';

import { Router } from './router';
import { Providers } from './providers';

const App: React.FC = () => {
    return (
        <Providers>
            <Router />
        </Providers>
    );
};

export default App;