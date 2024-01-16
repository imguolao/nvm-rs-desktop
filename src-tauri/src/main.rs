// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod http;
mod config;
mod invoke_handler;

use crate::invoke_handler::get_desktop_config;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_desktop_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
