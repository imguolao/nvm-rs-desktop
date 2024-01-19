// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod http;
mod config;
mod invoke_handler;

use crate::invoke_handler::get_node_version;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_node_version])
        .run(tauri::generate_context!())
        .expect("error while running nvm rs desktop application");
}
