VCS_TAG = $(shell cat ./VCS_TAG)

NAME = $(call CI_PROJECT_NAME)
REPO = $(call CI_PROJECT_PATH)
REGISTRY_HOST = $(call CI_REGISTRY)

dev:
	$(info Make: dev)
	@if [ "$(shell which node 2>/dev/null)" = "" ]; then \
		echo "No nodejs, install nodejs"; \
	exit 1; \
	fi;
	@if [ "$(shell which yarn 2>/dev/null)" = "" ]; then \
		echo "No yarn, install yarn"; \
		exit 1; \
	fi;
	@if [ "$(NPM_INSTALL)" = "" ]; then \
		yarn;\
	fi; \
	yarn dev;

build:
	$(info Make: build)
	@docker login -u $(call CI_REGISTRY_USER) -p $(call CI_REGISTRY_PASSWORD) $(REGISTRY_HOST)
	@docker build -t $(REGISTRY_HOST)/$(REPO):$(VCS_TAG) .
	@docker push $(REGISTRY_HOST)/$(REPO):$(VCS_TAG)

lint:
	$(info Make: lint)
	yarn lint:fix

deploy:
	$(info Make: deploy)
	@if [ "$(call CI_JOB_TOKEN)" ]; then \
		curl -s -X POST \
		-F token="$(call CI_JOB_TOKEN)" \
		-F ref=master \
		-F "variables[TARGET_PROJECT_NAMESPACE]=$(call CI_PROJECT_NAMESPACE)" \
		-F "variables[TARGET_PROJECT_NAME]=${NAME}" \
		-F "variables[TARGET_TAG]=${VCS_TAG}" \
		-F "variables[TARGET_BRANCH_NAME]=${TARGET_BRANCH_NAME}" \
		-F "variables[TARGET_ENVIRONMENT]=${ENV}" \
		https://$(call CI_SERVER_HOST)/api/v4/projects/3/trigger/pipeline; \
    else \
		echo "Deploy not available outside CI"; \
	fi

TARGET_BRANCH_NAME = $(shell echo $(call CI_COMMIT_BRANCH) | sed 's/_/-/g';)
ifneq ($(call CI_COMMIT_BRANCH),$(call CI_DEFAULT_BRANCH))
VCS_TAG = "$(call CI_COMMIT_BRANCH)-dev"
ENV = "testing"
else
ENV = "production"
endif
