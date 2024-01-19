use std::process::Command;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Message<T> {
    success: bool,
    data: Option<T>,
    message: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NodeVersion {
    version: String,
}

#[tauri::command]
pub fn get_node_version() -> Message<NodeVersion> {
    let output = match Command::new("node")
        .arg("--version")
        .output() {
            Ok(output) => output,
            Err(err) => {
                return Message {
                    data: None,
                    message: Some(err.to_string()),
                    success: false,
                };
            }
        };

    if output.status.success() {
        let version = String::from_utf8_lossy(&output.stdout);
        return Message {
            data: Some(NodeVersion { version: version.to_string() }),
            message: None,
            success: true,
        };
    }

    Message {
        data: None,
        message: None,
        success: false,
    }
}
