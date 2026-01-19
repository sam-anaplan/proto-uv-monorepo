# makeshift "pipeline script" to run all components and containers
pushd api-1
./run.sh > api-1.log 2>&1 &
popd

pushd api-2
./run.sh > api-2.log 2>&1 &
popd

pushd ui
./run.sh > ui.log 2>&1 &
popd

# Allow some time for all containers to start
sleep 5

echo "All components should have started."
