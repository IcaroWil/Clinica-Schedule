<?php

return [

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['https://*.vercel.app'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Authorization', 'Location'],

    'max_age' => 0,

    'supports_credentials' => false,
];
