FROM bitnami/rabbitmq:3.7-debian-9
MAINTAINER jxw <jxw608@petrochina.com.cn>

RUN cd ~

# Install rabbitmq_web_stomp
RUN rabbitmq-plugins enable rabbitmq_stomp && \
    rabbitmq-plugins enable rabbitmq_web_stomp && \
    rabbitmq-plugins enable rabbitmq_web_stomp_examples && \
    service rabbitmq-server stop 

EXPOSE 4369 5672 25672 15672 15674

# Expose our log volumes
VOLUME ["/var/log/rabbitmq"]

USER 1001
ENTRYPOINT [ "/app-entrypoint.sh" ]
CMD [ "nami", "start", "--foreground", "rabbitmq" ]
