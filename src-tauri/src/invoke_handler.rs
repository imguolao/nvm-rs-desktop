use crate::config::DesktopConfig;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Message<T> {
    success: bool,
    data: Option<T>,
    message: Option<String>,
}

#[tauri::command]
pub fn get_desktop_config() -> Message<DesktopConfig> {
    match DesktopConfig::new() {
        Ok(config) => Message {
            data: Some(config),
            message: None,
            success: true,
        },
        Err(err) => Message {
            data: None,
            message: Some(err.to_string()),
            success: false,
        }
    }
}
