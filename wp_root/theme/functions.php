<?php
  function wp_rest_api_alter() {
    $params = array(
        'get_callback'    => function($data, $field, $request, $type){
            if (function_exists('get_fields')) {
                return get_fields($data['id']);
            }
            return [];
            },
        'update_callback' => null,
        'schema'          => null,
    );
    register_api_field( 'page', 'fields', $params );
    register_api_field( 'post', 'fields', $params );
}
add_action( 'rest_api_init', 'wp_rest_api_alter');
