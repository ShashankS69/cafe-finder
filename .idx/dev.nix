{ pkgs, ... }: {
  channel = "stable-23.11"; 
  packages = [
    pkgs.nodePackages.firebase-tools
    pkgs.nodejs_20
  ];
  env = {
    # RUST_SRC_PATH = "${pkgs.rustPlatform.rustLibSrc}";

  };
  idx = {
    extensions = [
      "Dart-Code.flutter"
      "Dart-Code.dart-code"
      "rust-lang.rust-analyzer"
      "tamasfe.even-better-toml"
      "serayuzgur.crates"
      "vadimcn.vscode-lldb"
    "rangav.vscode-thunder-client"

    ];
    workspace = {
   

};
};
}