REGISTRY := registry.deti:5000
NAMESPACE := egs-conv
SERVICE := web-service
VERSION := latest

build:
	docker buildx build --platform linux/amd64 --network=host -t ${REGISTRY}/$(NAMESPACE)/$(SERVICE):$(VERSION) .

push:
	docker push ${REGISTRY}/$(NAMESPACE)/$(SERVICE):$(VERSION)