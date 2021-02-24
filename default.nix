{
  pkgs ? import <nixpkgs> {},
  delveBinary ? "",
  doCheck ? true
}:

with pkgs;
let
  client = (import ./client { inherit pkgs; }).package.overrideAttrs (oldAttrs: {
    buildInputs = oldAttrs.buildInputs ++ [ delveBinary ];
    buildPhase = oldAttrs.installPhase;
    checkPhase = ''
      mkdir home
      export HOME=$PWD/home

      delve server &
      PID=$!
      sleep 15s

      npm run test || (kill -9 $PID && exit 1)
      echo "Shutting down delve server. Pid: $PID"
      kill -9 $PID
    '';

    installPhase = ''
      echo "Doing nothing..."
    '';

    inherit doCheck;
  });

  cloud_client = (import ./cloud_client { inherit pkgs; }).package.overrideAttrs (oldAttrs: {
    buildInputs = oldAttrs.buildInputs ++ [ delveBinary ];
    checkPhase = ''
      echo "No current checks for cloud client..."
    '';

    inherit doCheck;
  });
in
stdenv.mkDerivation rec {
  name = "delve-javascript-client-sdk-${version}";
  version = "1.1.3";
  src = ./.;
  installPhase = ''
    mkdir -p $out/{client,cloud_client,docs}
    cp -rv ${client}/* $out/client
    cp -rv ${cloud_client}/* $out/cloud_client
    cp -rv docs/* $out/docs
  '';
}
