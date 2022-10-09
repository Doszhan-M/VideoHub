FROM elasticsearch:7.6.0

USER elasticsearch

# RUN bin/elasticsearch-plugin install https://github.com/fooger/elasticsearch-analysis-morphology/raw/master/analysis-morphology-7.6.0.zip
COPY plugins/ /usr/share/elasticsearch/plugins_installer/
RUN bin/elasticsearch-plugin install file:///usr/share/elasticsearch/plugins_installer/analysis-morphology-7.6.0.zip

CMD elasticsearch
