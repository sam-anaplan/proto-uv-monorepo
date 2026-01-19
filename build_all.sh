# makeshift "pipeline script" to build all components and containers
pushd api-1
./build.sh
popd

pushd api-2
./build.sh
popd

pushd ui
./build.sh
popd
